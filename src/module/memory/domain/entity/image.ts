import { randomUUID } from "crypto";
import { Mimetype } from "../value-object/mimetype";
import { File, FileCreateProps } from "./file";

export type ImageCreateProps = Omit<FileCreateProps, "name">;

export type ImageBuildProps = FileCreateProps;

export class Image extends File {
  private constructor(props: ImageBuildProps) {
    super(props);
  }

  static create(props: ImageCreateProps) {
    const mimetype = new Mimetype(props.mimetype);
    const name = `${randomUUID()}.${mimetype.getExtension()}`;
    return new Image({ ...props, name });
  }

  static build(props: ImageBuildProps) {
    return new Image(props);
  }
}
