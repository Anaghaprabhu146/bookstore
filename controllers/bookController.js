const bookModel = require("../models/bookModel");


// add books
exports.AddBookController = async (req, res) => {
  console.log(req.user);
  try {
    let {
      title,
      author,
      noOfPages,
      imgUrl,
      price,
      discountPrice,
      abstract,
      publisher,
      language,
      ISBN,
      category,
      // uploadImages,
    } = req.body;

    let imageArray=[]
    req.files.forEach((eachFile)=>imageArray.push(eachFile.filename))



    let userMail = req.user;

    if (
      title &&
      author &&
      noOfPages &&
      imgUrl &&
      publisher &&
      language &&
      ISBN &&
      category &&
      imageArray &&
      price &&
      discountPrice
    ) {
      // to check if any booj with same title is already addded or not

      //   find returns an aarray even if there is no elements it returns an empty array

      // findOne:it returns only one element
      let existingBook = await bookModel.findOne({ title: title });
      if (existingBook) {
        // error

        // confilt
        res
          .status(409)
          .json({ message: "book with this title is already added" });
      } else {
        // proceed to add data

        let newBook = new bookModel({
          title,
          author,
          noOfPages,
          imgUrl,
          price,
          discountPrice,
          abstract,
          publisher,
          language,
          ISBN,
          category,
          uploadImages:imageArray,
          userMail,
        });

        await newBook.save();
        res.status(201).json({ message: "sucessfully added", newBook });
      }
    } else {
      res.status(400).json({ message: "fileds are not feild" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "something went wrong in server" });
  }
};


// getall boooks
exports.getBookController=async(req,res)=>{
  try {
    // search
   let searchKey=req.query.search
   let query={
    title:{
      $regex:searchKey,
      $options:'i'
    }
   }
    let bookData= await bookModel.find(query)
    res.status(200).json({message:"book details are succesfully",bookData})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"something went wrong in server"})
    
  }
}


// display the details
exports.getLimitedBooks=async(req,res)=>{
  try {
    let limitedData= await bookModel.find().limit(6)
    res.status(200).json({message:"book fetched successfully",limitedData})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"something went wrong in server"})
    
  }
}


// get one book details

exports.getSingleBook=async (req,res)=>{
  try {
    let id=req.params.id;
    let singleBookData=await bookModel.findById({_id:id})
    res.status(200).json({singleBookData})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"something went wrong in server"})
    
  }
}