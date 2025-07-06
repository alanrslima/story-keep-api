import { userRequester, adminRequester } from "../helpers-integration";

it("should init, update and select a plan for a memory", async () => {
  // Create memory plan
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

  // Init a memory
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

  // List memory plans
  const plansListResponse = await userRequester("memory/plan", "GET");
  expect(plansListResponse.status).toEqual(200);
  const plansListData = await plansListResponse.json();
  expect(plansListData).toHaveLength(1);
  expect(plansListData[0].id).toBeDefined();
  expect(plansListData[0].name).toEqual("Plano Pro");

  // Select plan at the previous created memory
  const selectPlanResponse = await userRequester(
    "memory/select-plan",
    "PATCH",
    { memoryId: initData.id, planId: plansListData[0].id }
  );
  expect(selectPlanResponse.status).toBe(200);

  // List all memories
  const listMemoryResponse = await userRequester("memory", "GET");
  expect(listMemoryResponse.status).toEqual(200);
  const listMemoryData = await listMemoryResponse.json();
  expect(listMemoryData).toHaveLength(1);
  expect(listMemoryData[0].name).toEqual("Jackson party");
  expect(listMemoryData[0].address).toEqual("Wall Street");

  // Create order intent
  const orderIntentResponse = await userRequester(
    "memory/order/intent",
    "POST",
    { memoryId: initData.id }
  );
  expect(orderIntentResponse.status).toEqual(201);
});
