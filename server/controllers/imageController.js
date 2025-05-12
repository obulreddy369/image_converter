import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;
    const user = await userModel.findById(userId);
    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing details" });
    }
    if (user.creditBalance <= 0) {
      return res.json({ success: false, message: "Insufficient credit balance", creditBalance: user.creditBalance });
    }
    const formdata = new FormData();
    formdata.append("prompt", prompt);
    const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formdata, {
      headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY,
        ...formdata.getHeaders(),
      },
      responseType: "arraybuffer",
    });
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;
    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });
    res.json({ success: true, message: "Image generated", creditBalance: user.creditBalance - 1, resultImage });
  } catch (error) {
    console.log("Image not generated");
    res.json({ success: false, message: error.message });
  }
};