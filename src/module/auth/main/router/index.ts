import { OpenIdGoogleGateway } from "../../infra/gateway/open-id-google-gateway";

OpenIdGoogleGateway.getInstance().initClientConfiguration();

export * from "./auth-router";
