
import { model, Schema, Types } from "mongoose";
import "dotenv/config"

const schema = new Schema(
  {
    spesialization: {
      type: String,
      enum: ["cardiology", "oncology", "neurology", "pediatrics", "surgery"],
      required: [true, "spesialization is required"],
    },
    userId: {
      type: Types.ObjectId,
      ref:'User',
    },
    fullName:String,
    image:String,
    appointments:[] 
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
schema.post('init', (doc) =>{
    if(doc.image){
    doc.image = process.env.BASE_URL+`docter/` + doc.image   
    }
    
})
const Docter = model("Docter", schema);
export default Docter;
