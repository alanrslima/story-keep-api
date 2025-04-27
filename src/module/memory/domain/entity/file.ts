import { Mimetype } from "../value-object/mimetype";

export type FileCreateProps = {
  name: string;
  size: number;
  mimetype: string;
  buffer?: Buffer;
};

export class File {
  private name: string;
  private size: number;
  private mimetype: Mimetype;
  private buffer?: Buffer;

  constructor(props: FileCreateProps) {
    this.name = props.name;
    this.size = props.size;
    this.mimetype = new Mimetype(props.mimetype);
    this.buffer = props.buffer;
  }

  getName() {
    return this.name;
  }

  getSize() {
    return this.size;
  }

  getBuffer() {
    return this.buffer;
  }

  getMimetype() {
    return this.mimetype.getValue();
  }
}
