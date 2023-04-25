import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Clear";
import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import "./building-info-menu.css";

export const ModelListMenu: FC = () => {
  const [{ building, user }, dispatch] = useAppContext();

  if (!building || !user) {
    throw new Error("Error: building or user not found!");
  }

  const onUploadModel = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.style.visibility = "hidden";
    document.body.appendChild(input);

    input.onchange = () => {
      console.log("Input.files");
      input.remove();
    };
    input.click();
  };

  return (
    <div>
      {building.models.length ? (
        building.models.map((model) => (
          <div className="list-item" key={model.id}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
            <span className="margin-left">{model.name}</span>
          </div>
        ))
      ) : (
        <p>This building has no models.</p>
      )}
      <div className="list-item">
        <Button onClick={onUploadModel}>Upload Model</Button>
      </div>
    </div>
  );
};
