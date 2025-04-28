import { ID } from "../../../common";
// import { FileTooLargeError } from "../../errors/file-too-large-error";
// import { MimetypeNotAcceptedError } from "../../errors/mimetype-not-accepted-error";
// import { Filename } from "../value-object/filename";
import { Mimetype } from "../value-object/mimetype";

export type CreateFileProps = {
  size: number;
  mimetype: string;
  buffer?: Buffer;
  name: string;
};

export type BuildFileProps = CreateFileProps & {
  id: string;
};

export class MediaFile {
  private id: ID;
  // private name: Filename;
  private size: number;
  private mimetype: Mimetype;
  private buffer?: Buffer;
  private location?: string;

  constructor(values: BuildFileProps) {
    // this.name = new Filename(new Mimetype(values.mimetype), values.name);
    this.size = values.size;
    this.mimetype = new Mimetype(values.mimetype);
    this.buffer = values.buffer;
    this.id = new ID(values.id);
  }

  protected checkMaxFileSize(maxFileSize: number) {
    if (this.size > maxFileSize) {
      //   throw new FileTooLargeError("O arquivo deve possuir no máximo 50MB");
    }
  }

  protected checkAcceptedMimetypes(mimetypes: string[]) {
    if (!mimetypes.some((i) => i === this.mimetype.getValue())) {
      //   throw new MimetypeNotAcceptedError();
    }
  }

  // protected static generateFilename(mimetype: string): string {
  // return new Filename(new Mimetype(mimetype)).getValue();
  // }

  getExtension(): string | undefined {
    return this.mimetype.getExtension();
  }

  getId(): string {
    return this.id.getValue();
  }

  // getName(): string {
  //   return this.name.getValue();
  // }

  getBuffer() {
    return this.buffer;
  }

  getLocation() {
    return this.location;
  }

  getSize() {
    return this.size;
  }

  getMimetype(): string {
    return this.mimetype.getValue();
  }

  addLocation(location?: string) {
    this.location = location;
  }
}
