import bodyParser from 'body-parser';
import express from 'express';
import { BASE_ONION_ROUTER_PORT } from '../config';
import { generateRsaKeyPair, exportPrvKey } from '../crypto';

let lastReceivedEncryptedMessage: string | null = null;
let lastReceivedDecryptedMessage: string | null = null;
let lastMessageDestination: number | null = null;

// A map to store the private keys for each node by nodeId
const privateKeys = new Map<number, string>();

export async function simpleOnionRouter(nodeId: number) {
  const onionRouter = express();
  onionRouter.use(express.json());
  onionRouter.use(bodyParser.json());

  // Initialize the node with keys and register with the registry
  const { publicKey, privateKey } = await generateRsaKeyPair();

  const privateKeyBase64 = await exportPrvKey(privateKey);
if (privateKeyBase64 !== null) {
  privateKeys.set(nodeId, privateKeyBase64);
} else {
  // Handle the case where privateKeyBase64 is null
  // This might include throwing an error or logging a message.
  console.error('Private key for node', nodeId, 'is null after export.');
}

  // Here you would also register the node with the registry using the public key

  onionRouter.get('/status', (req, res) => {
    res.send('live');
  });

  onionRouter.get('/getLastReceivedEncryptedMessage', (req, res) => {
    res.json({ result: lastReceivedEncryptedMessage });
  });

  onionRouter.get('/getLastReceivedDecryptedMessage', (req, res) => {
    res.json({ result: lastReceivedDecryptedMessage });
  });

  onionRouter.get('/getLastMessageDestination', (req, res) => {
    res.json({ result: lastMessageDestination });
  });

  onionRouter.get('/getPrivateKey', (req, res) => {
    // Retrieve the private key for this node
    const privateKey = privateKeys.get(nodeId);
    if (privateKey) {
      res.json({ result: Buffer.from(privateKey).toString('base64') });
    } else {
      res.status(404).send('Private key not found');
    }
  });

  const server = onionRouter.listen(BASE_ONION_ROUTER_PORT + nodeId, () => {
    console.log(
      `Onion router ${nodeId} is listening on port ${
        BASE_ONION_ROUTER_PORT + nodeId
      }`
    );
  });

  return server;
}
