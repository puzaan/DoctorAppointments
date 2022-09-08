const {bookingSchema}=require("../../../database/booking_schema");
const {adminSchema}=require("../../../database/admin_schema");
const approveBooking=(req,res)=>{
    const requestId=req.params.id;
    const createdBy=req.createdBy ;
    const adminId=req.adminId;
    console.log(requestId,adminId);
    bookingSchema.findOne({requestId:requestId}).exec(async(error,done)=>{
        if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
        if(done){
            //for super admin
            if(adminId===1){
                console.log(adminId);
                await bookingSchema.findOneAndUpdate({requestId:requestId},{approved:true,approvedBy:adminId});
                const tempData=await bookingSchema.findOne({requestId:requestId});
                res.status(200).json({"msg":"Booking Approved","data":tempData});
                return;
            }
            //searching for admin id
            adminSchema.findOne({adminId:adminId}).exec(async(error,done)=>{
                if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
                if(done){
                    await bookingSchema.findOneAndUpdate({requestId:requestId},{approved:true,approvedBy:adminId});
                    const tempData=await bookingSchema.findOne({requestId:requestId});
                    res.status(200).json({"msg":"Booking Approved","data":tempData});
                }else{
                    res.status(400).json({"msg":"Admin Id not found"});
                }
            });
        }else{
            res.status(400).json({"msg":"No data found for given request Id"})
        }
    })
}

const cancelBooking=(req,res)=>{
    const requestId=req.params.id;
    const adminId=req.adminId;
    console.log(requestId,adminId);
    bookingSchema.findOne({requestId:requestId}).exec(async(error,done)=>{
        if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
        if(done){
            //for super admin
            if(adminId===1){
                await bookingSchema.findOneAndUpdate({requestId:requestId},{approved:false,approvedBy:adminId});
                const tempData=await bookingSchema.findOne({requestId:requestId});
                res.status(200).json({"msg":"Booking Cancled","data":tempData});
                return; 
            }
            //searching for admin id
            adminSchema.findOne({adminId:adminId}).exec(async(error,done)=>{
                if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
                if(done){
                    await bookingSchema.findOneAndUpdate({requestId:requestId},{approved:false,approvedBy:adminId});
                    const tempData=await bookingSchema.findOne({requestId:requestId});
                    res.status(200).json({"msg":"Booking Cancled","data":tempData});
                }else{
                    res.status(400).json({"msg":"Admin Id not found"});
                }
            });
        }else{
            res.status(400).json({"msg":"No data found for given request Id"})
        }
    })
}

const viewAllBookingRequest=(req,res)=>{
    bookingSchema.find({}).sort({_id:-1}).exec((error,done)=>{
        if(error){res.status(500).json({"msg":"Internal Server Error"});return;};
        res.status(200).json({"msg":"All booking request fetched","data":done});
    })
}
const viewBookingRequestById=(req,res)=>{
    bookingSchema.findOne({requestId:req.params.id}).exec((error,done)=>{
        if(error){res.status(500).json({"msg":"Internal Server Error"});return;};
        if(done){
        res.status(200).json({"msg":"Booking request by Id","data":done});
        }else{
            res.status(400).json({"msg":"No data found for given Id"});
        }
    })
}
const viewActiveRequest=(req,res)=>{
    bookingSchema.find({approved:true}).exec((error,done)=>{
        if(error){res.status(500).json({"msg":"Internal Server Error"});return;};
        res.status(200).json({"msg":"All booking request fetched ","data":done});
    });
}

const viewInactiveRequest=(req,res)=>{
    bookingSchema.find({approved:false}).exec((error,done)=>{
        if(error){res.status(500).json({"msg":"Internal Server Error"});return;};
        res.status(200).json({"msg":"All booking request fetched","data":done});
    });
}

const deleteBookingRequest=(req,res)=>{
    bookingSchema.findOneAndDelete({requestId:req.params.id}).exec((error,done)=>{
        if(error){res.status(500).json({"msg":"Internal Server Error"})};
        if(done){
            res.status(200).json({"msg":"Booking Request Deleted!!","data":done})
        }else{
            console.log(error)
            res.status(400).json({"msg":"Booking request Id Invalid"})
        }
    });
}
const editBooking=(req,res)=>{
    const field=req.query.field;
    const value=req.query.value;
    bookingSchema.findOne({requestId:req.params.id}).exec((error,done)=>{
        if(error){res.status(500).json({"msg":"Internal Server Error"})};
        if(done){
            if(field=="fullName"){
                bookingSchema.findOneAndUpdate({requestId:req.params.id},{fullName:value}).exec((error,done)=>{
                    if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
                    if(done){
                        res.status(200).json({"msg":"Full Name Changed","data":done});
                    }

                })
            }else if(field=="age"){
                bookingSchema.findOneAndUpdate({requestId:req.params.id},{age:value}).exec((error,done)=>{
                    if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
                    if(done){
                        res.status(200).json({"msg":"Age value Changed","data":done});
                    }

                })
            }else if(field=="sex"){
                bookingSchema.findOneAndUpdate({requestId:req.params.id},{sex:value}).exec((error,done)=>{
                    if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
                    if(done){
                        res.status(200).json({"msg":"sex value Changed","data":done});
                    }

                })
            }else if(field=="contact"){
                bookingSchema.findOneAndUpdate({requestId:req.params.id},{contact:value}).exec((error,done)=>{
                    if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
                    if(done){
                        res.status(200).json({"msg":"Contact Number Changed","data":done});
                    }

                })
            }else if(field=="email"){
                bookingSchema.findOneAndUpdate({requestId:req.params.id},{email:value}).exec((error,done)=>{
                    if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
                    if(done){
                        res.status(200).json({"msg":"Email value Changed","data":done});
                    }

                })
            }else if(field=="address"){
                bookingSchema.findOneAndUpdate({requestId:req.params.id},{address:value}).exec((error,done)=>{
                    if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
                    if(done){
                        res.status(200).json({"msg":"Address value Changed","data":done});
                    }

                })
            }else if(field=="doctorId"){
                bookingSchema.findOneAndUpdate({requestId:req.params.id},{doctorId:value}).exec((error,done)=>{
                    if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
                    if(done){
                        res.status(200).json({"msg":"Doctor Id Changed","data":done});
                    }

                })
            }else if(field=="timeslot"){
                bookingSchema.findOneAndUpdate({requestId:req.params.id},{timeslot:value}).exec((error,done)=>{
                    if(error){res.status(500).json({"msg":"Internal Server Error"});return;}
                    if(done){
                        res.status(200).json({"msg":"Time slot value Changed","data":done});
                    }

                })
            }else{
                res.status(400).json({"msg":"Field type not defined"});
            }
            
        }else{
            res.status(400).json({"msg":"Booking request Id Invalid/Not found"})
        }
    });
}
module.exports={editBooking,approveBooking,cancelBooking,viewAllBookingRequest,viewBookingRequestById,viewActiveRequest,viewInactiveRequest,deleteBookingRequest};