import { neon } from "@neondatabase/serverless";

export const GET = async () => {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const response = await sql`SELECT * FROM drivers`;

    return Response.json({ data: response });
  } catch (err) {
    console.log(err);
    return Response.json({
      err: err,
    });
  }
};
