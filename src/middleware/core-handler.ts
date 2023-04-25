import { mapHandler } from "../core/map/map-handler";
import { authHandler } from "../core/auth-handler";
import { Action } from "./actions";
import { Events } from "./event-handler";
import { databaseHandler } from "../core/db/db-handler";

export const executeCore = (action: Action, events: Events) => {
  if (action.type === "LOGIN") {
    authHandler.login();
  }
  if (action.type === "LOGOUT") {
    authHandler.logout();
  }
  if (action.type === "START_MAP") {
    const { container, user } = action.payload;
    mapHandler.start(container, user, events);
  }
  if (action.type === "REMOVE_MAP") {
    mapHandler.remove();
  }
  if (action.type === "ADD_BUILDING") {
    mapHandler.addBuilding(action.payload);
  }
  if (action.type === "DELETE_BUILDING") {
    databaseHandler.deleteBuilding(action.payload, events);
  }
  if (action.type === "UPDATE_BUILDING") {
    databaseHandler.updateBuilding(action.payload);
  }
  if (action.type === "UPLOAD_MODEL") {
    const { model, file, building } = action.payload;
    databaseHandler.uploadModel(model, file, building, events);
  }
  if (action.type === "DELETE_MODEL") {
    const { model, building } = action.payload;
    databaseHandler.deleteModel(model, building, events);
  }
};
