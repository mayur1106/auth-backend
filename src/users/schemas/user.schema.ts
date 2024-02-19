import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform(doc, field) {
      field.id = field._id;
      delete field._id;
      delete field.__v;
    },
  },
})
export class User {
  @Prop({ required: true })
  @ApiProperty({ example: 'Mayur', type: String })
  firstName: string;

  @ApiProperty({ example: 'Thosar', type: String })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({ example: 'abc@gmail.com', type: String })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: '*********', type: String })
  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
