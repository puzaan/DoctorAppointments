const {bookingSchema}=require("../../database/booking_schema");
const {doctorSchema}=require("../../database/doctor_schema");

const createBooking=(req,res)=>{
    const {fullName,age,sex,contact,email,address,message,doctorId,date,occupation,timeslot}=req.body;
    doctorSchema.findOne({"doctorId":doctorId}).exec((error,done)=>{
        if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
        if(done){
           console.log(occupation);
            bookingSchema.create({
                fullName:fullName,
                occupation:occupation,
                message:message,
                age:age,
                sex:sex,
                contact:contact,
                email:email,
                address:address,
                doctorId:doctorId,
                bookingdate:date,
                timeslot:timeslot
            },function(error,done){
                console.log(error);
                if(error){res.status(500).json({"msg":"Internal Server Error"});return;};
                if(done){
                    res.status(200).json({"msg":"Booking Request Added!!","data":done});
                }
            })

        }else{
            res.status(400).json({"msg":"No data found for given doctor Id"});
        }
    })
   
}



module.exports={createBooking};