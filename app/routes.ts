import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dashboard", "./routes/dashboard/index.tsx", [
    route("profile", "./routes/dashboard/profile.tsx"),
  ]),
  route("onboarding", "./routes/onboarding/index.tsx", [
    route("get-started", "./routes/onboarding/get-started.tsx"),
    route("option", "./routes/onboarding/option.tsx"),
    route("signin", "./routes/onboarding/login.tsx"),
    // route("register/:type?", "./routes/onboarding/register.tsx"),
    route("signup", "./routes/onboarding/signup.tsx"),
    route("verify", "./routes/onboarding/verify-code.tsx"),
    // route("google/callback", "./routes/onboarding/google-callback.tsx"),
    // route("employer-register", "./routes/onboarding/register.tsx"),
  ]),
  route("invite/:code", "./routes/invite.tsx"),
] satisfies RouteConfig;
