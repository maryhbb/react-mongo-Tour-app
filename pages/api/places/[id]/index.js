import dbConnect from "@/db/dbConnect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  try {
    await dbConnect();
    const { id } = request.query;

    if (!id) {
      return response.status(400).json({ status: "Bad Request" });
    }

    if (request.method === "GET") {
      const place = await Place.findById(id);

      if (!place) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(place);
    }

    if (request.method === "PUT") {
      const newPlaceData = request.body;
      await Place.findByIdAndUpdate(id, newPlaceData);
      return response.status(200).json({ status: "Entry updated" });
    }

    return response.status(405).json({ status: "Method Not Allowed" });
  } catch (error) {
    console.error("An error occurred:", error);
    return response.status(500).json({ status: "Internal Server Error" });
  }
}
