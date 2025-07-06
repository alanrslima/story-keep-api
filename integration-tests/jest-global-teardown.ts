// import {MysqlDatabase} from '../src/modules/nvg-node-common';

import { MysqlDataSource } from "../src/module/common";

export default async () => {
  await MysqlDataSource.getInstance().disconnect();
};
