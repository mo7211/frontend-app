import { Building } from "./../../types";
import { BuildingDatabase } from "./building-database";
import * as OBC from "openbim-components";
import * as THREE from "three";
import { downloadZip } from "client-zip";
import { unzip } from "unzipit";
import { withTheme } from "@emotion/react";

export class BuildingScene {
  database = new BuildingDatabase();

  private components: OBC.Components;
  private fragments: OBC.Fragments;
  private sceneEvents: { name: any; action: any }[] = [];

  get container() {
    const domElement = this.components.renderer.get().domElement;
    return domElement.parentElement as HTMLDivElement;
  }

  constructor(container: HTMLDivElement, building: Building) {
    this.components = new OBC.Components();

    const sceneComponent = new OBC.SimpleScene(this.components);
    const scene = sceneComponent.get();

    scene.background = null;

    const directionalLight = new THREE.DirectionalLight();
    directionalLight.position.set(5, 10, 3);
    directionalLight.intensity = 0.5;
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight();
    ambientLight.intensity = 0.5;
    scene.add(ambientLight);

    this.components.scene = sceneComponent;
    this.components.renderer = new OBC.SimpleRenderer(
      this.components,
      container
    );

    this.components.camera = new OBC.SimpleCamera(this.components);
    this.components.raycaster = new OBC.SimpleRaycaster(this.components);
    this.components.init();

    const dimensions = new OBC.SimpleDimensions(this.components);
    this.components.tools.add(dimensions);

    const clipper = new OBC.EdgesClipper(this.components, OBC.EdgesPlane);
    this.components.tools.add(clipper);

    const grid = new OBC.SimpleGrid(this.components);
    this.components.tools.add(grid);

    this.fragments = new OBC.Fragments(this.components);

    this.fragments.highlighter.active = true;
    const selectMat = new THREE.MeshBasicMaterial({ color: "white" });
    const preselectMat = new THREE.MeshBasicMaterial({
      color: "white",
      opacity: 0.5,
      transparent: true,
    });

    this.fragments.highlighter.add("selection", [selectMat]);
    this.fragments.highlighter.add("preselection", [preselectMat]);

    this.components.tools.add(this.fragments);
    this.setupEvents();
    this.loadAllModels(building);

    this.fragments.exploder.groupName = "floor";
  }

  dispose() {
    this.toggleEvents(false);
    this.components.dispose();
    (this.components as any) = null;
    (this.fragments as any) = null;
  }

  explode(active: boolean) {
    const exploder = this.fragments.exploder;
    if (active) {
      exploder.explode();
    } else {
      exploder.reset();
    }
  }
  private setupEvents() {
    this.sceneEvents = [
      { name: "mouseup", action: this.updateCulling },
      { name: "wheel", action: this.updateCulling },
      { name: "mousemove", action: this.preselect },
      { name: "click", action: this.select },
      { name: "keydown", action: this.createClippingPlane },
      { name: "keydown", action: this.createDimension },
      { name: "keydown", action: this.deleteClippingPlaneOrDimension },
    ];
    this.toggleEvents(true);
  }

  private toggleEvents(active: boolean) {
    for (const event of this.sceneEvents) {
      if (active) {
        window.addEventListener(event.name, event.action);
      } else {
        window.removeEventListener(event.name, event.action);
      }
    }
  }

  toggleClippingPlanes(active: boolean) {
    const clipper = this.getClipper();
    if (clipper) {
      clipper.enabled = active;
    }
  }

  toggleDimensions(active: boolean) {
    const dimensions = this.getDimensions();
    if (dimensions) {
      dimensions.enabled = active;
    }
  }

  private createClippingPlane = (event: KeyboardEvent) => {
    if (event.code === "KeyP") {
      const clipper = this.getClipper();
      if (clipper) {
        clipper.create();
      }
    }
  };

  private createDimension = (event: KeyboardEvent) => {
    if (event.code === "KeyD") {
      const dims = this.getDimensions();
      if (dims) {
        dims.create();
      }
    }
  };

  private getDimensions() {
    return this.components.tools.get(
      "SimpleDimensions"
    ) as OBC.SimpleDimensions;
  }

  private deleteClippingPlaneOrDimension = (event: KeyboardEvent) => {
    if (event.code === "Delete") {
      const dims = this.getDimensions();
      dims.delete();
      const clipper = this.getClipper();
      clipper.delete();
    }
  };

  private getClipper() {
    return this.components.tools.get("EdgesClipper") as OBC.EdgesClipper;
  }

  private preselect = () => {
    this.fragments.highlighter.highlight("preselection");
  };

  private select = () => {
    this.fragments.highlighter.highlight("selection");
  };

  private updateCulling = () => {
    this.fragments.culler.needsUpdate = true;
  };

  private async loadAllModels(building: Building) {
    const modelURLs = await this.database.getModels(building);
    for (const url of modelURLs) {
      const { entries } = await unzip(url);

      const fileNames = Object.keys(entries);

      for (let i = 0; i < fileNames.length; i++) {
        const name = fileNames[i];
        if (!name.includes(".glb")) continue;

        const geometryName = fileNames[i];
        const geometry = await entries[geometryName].blob();
        const geometryURL = URL.createObjectURL(geometry);

        const dataName =
          geometryName.substring(0, geometryName.indexOf(".glb")) + ".json";
        const dataBlob = await entries[dataName].blob();

        const dataURL = URL.createObjectURL(dataBlob);

        const fragment = await this.fragments.load(geometryURL, dataURL);

        // Group items by category and by floor

        const data = await entries[dataName].json();
        const allTypes = await entries["all-types.json"].json();
        const modelTypes = await entries["model-types.json"].json();
        const levelsProperties = await entries["levels-properties.json"].json();
        const levelsRelationship = await entries[
          "levels-relationship.json"
        ].json();

        const groups = { category: {}, floor: {} } as any;

        const floorNames = {} as any;
        for (const levelProps of levelsProperties) {
          floorNames[levelProps.expressID] = levelProps.Name.value;
        }

        for (const id of data.ids) {
          // Get the category of the items

          const categoryExpressID = modelTypes[id];
          const category = allTypes[categoryExpressID];
          if (!groups.category[category]) {
            groups.category[category] = [];
          }
          groups.category[category].push(id);

          // Get the floors of the items

          const floorExpressID = levelsRelationship[id];
          const floor = floorNames[floorExpressID];
          if (!groups["floor"][floor]) {
            groups["floor"][floor] = [];
          }
          groups["floor"][floor].push(id);
        }

        this.fragments.groups.add(fragment.id, groups);

        this.fragments.culler.needsUpdate = true;
        this.fragments.highlighter.update();
      }
    }
  }

  async convertIfcToFragments(ifc: File) {
    let fragments = new OBC.Fragments(this.components);

    // Dont import rooms, spaces
    fragments.ifcLoader.settings.optionalCategories.length = 0;

    fragments.ifcLoader.settings.wasm = {
      path: "../../",
      absolute: false,
    };

    fragments.ifcLoader.settings.webIfc = {
      COORDINATE_TO_ORIGIN: true,
      USE_FAST_BOOLS: true,
    };

    const url = URL.createObjectURL(ifc) as any;
    const model = await fragments.ifcLoader.load(url);
    const file = await this.serializeFragments(model);

    fragments.dispose();
    (fragments as any) = null;

    return file as File;
  }

  private async serializeFragments(model: OBC.FragmentGroup) {
    const files = [];
    for (const frag of model.fragments) {
      const file = await frag.export();
      files.push(file.geometry, file.data);
    }

    files.push(new File([JSON.stringify(model.properties)], "properties.json"));
    files.push(
      new File(
        [JSON.stringify(model.levelRelationships)],
        "levels-relationship.json"
      )
    );
    files.push(new File([JSON.stringify(model.itemTypes)], "model-types.json"));
    files.push(new File([JSON.stringify(model.allTypes)], "all-types.json"));
    files.push(
      new File(
        [JSON.stringify(model.floorsProperties)],
        "levels-properties.json"
      )
    );
    files.push(
      new File(
        [JSON.stringify(model.coordinationMatrix)],
        "coordination-matrix.json"
      )
    );
    files.push(
      new File(
        [JSON.stringify(model.expressIDFragmentIDMap)],
        "express-fragment-map.json"
      )
    );

    return downloadZip(files).blob();
  }
}
