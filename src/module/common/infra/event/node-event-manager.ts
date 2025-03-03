import { EventEmitter } from "events";

export class NodeEventManager extends EventEmitter {
  private static instance: NodeEventManager;

  private constructor() {
    super();
  }

  public static getInstance(): NodeEventManager {
    if (!NodeEventManager.instance) {
      NodeEventManager.instance = new NodeEventManager();
    }
    return NodeEventManager.instance;
  }
}
