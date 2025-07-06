import { userRequester, adminRequester } from "../helpers-integration";

it("should init, update and select a plan for a memory", async () => {
  const createPlanResponse = await adminRequester("memory/plan", "POST", {
    name: "Plano Pro",
    description: "Até 5.000 fotos e 500 vídeos",
    currencyCode: "BRL",
    priceCents: 1990,
    photosLimit: 5000,
    videosLimit: 500,
    position: 1,
  });
  expect(createPlanResponse.status).toEqual(201);

  const initResponse = await userRequester("memory/init", "POST");
  expect(initResponse.status).toEqual(201);
  const initData = await initResponse.json();
  expect(initData.id).toBeDefined();
  const updateResponse = await userRequester("memory", "PATCH", {
    id: initData.id,
    name: "Jackson party",
    address: "Wall Street",
    startDate: new Date().toISOString(),
  });
  expect(updateResponse.status).toEqual(200);
  const plansListResponse = await userRequester("memory/plan", "GET");
  expect(plansListResponse.status).toEqual(200);
  const plansListData = await plansListResponse.json();
  expect(plansListData).toHaveLength(1);
  expect(plansListData[0].id).toBeDefined();
  expect(plansListData[0].name).toEqual("Plano Pro");
  const selectPlanResponse = await userRequester(
    "memory/select-plan",
    "PATCH",
    { memoryId: initData.id, planId: plansListData[0].id }
  );
  expect(selectPlanResponse.status).toBe(200);

  const listMemoryResponse = await userRequester("memory", "GET");
  expect(listMemoryResponse.status).toEqual(200);
  const listMemoryData = await listMemoryResponse.json();
  expect(listMemoryData).toHaveLength(1);
  expect(listMemoryData[0].name).toEqual("Jackson party");
  expect(listMemoryData[0].address).toEqual("Wall Street");
});
