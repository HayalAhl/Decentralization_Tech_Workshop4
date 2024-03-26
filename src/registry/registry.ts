import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { REGISTRY_PORT } from "../config";

export type Node = { nodeId: number; pubKey: string };
let nodes: { nodeId: number; pubKey: string; }[] = [];


export type RegisterNodeBody = {
  nodeId: number;
  pubKey: string;
};

export type GetNodeRegistryBody = {
  nodes: Node[];
};

export async function launchRegistry() {
  const _registry = express();
  _registry.use(express.json());
  _registry.use(bodyParser.json());

  _registry.get("/status", (req, res) => {
    res.send('live');
  });

  const server = _registry.listen(REGISTRY_PORT, () => {
    console.log(`registry is listening on port ${REGISTRY_PORT}`);
  });

  

_registry.post("/registerNode", (req, res) => {
  const { nodeId, pubKey } = req.body;
  nodes.push({ nodeId, pubKey });
  res.status(200).send("Node registered successfully");
});

_registry.get("/getNodeRegistry", (req, res) => {
  res.json({ nodes });
});




  return server;
}
