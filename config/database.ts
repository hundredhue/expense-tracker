import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import * as SQLite from "expo-sqlite";

const database_name = "savvyJarDB.db";

export const loadDatabase = async () => {
  const dbAsset = require(`@/assets/${database_name}`);
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${database_name}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);

  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

let db: Promise<SQLite.SQLiteDatabase>;

const openDatabase = () => {
  if (!db) {
    db = SQLite.openDatabaseAsync(database_name);
  }
  return db;
};

export const getDatabase = () => {
  return openDatabase();
};
