import { createConnections } from 'typeorm';
import { createDatabase } from 'typeorm-extension';

const connect = async (): Promise<void> => {
  try {
    await createDatabase({ ifNotExist: true });
    await createConnections();
  } catch (err) {
    console.error('ERROR when trying to create a connection:');
    console.error(err);
    process.exit(1);
  }
};

connect();
