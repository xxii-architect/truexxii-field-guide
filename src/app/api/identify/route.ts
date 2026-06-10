export const runtime = "nodejs";

import { identifyPlantRoute } from "@/domains/plant-id/api/identify";

export async function POST(req: Request) {
  return identifyPlantRoute(req);
}
