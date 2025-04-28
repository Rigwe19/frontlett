import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("dashboard", "./routes/dashboard/index.tsx", [
    index("./routes/dashboard/dashboard.tsx"),
    route("profile", "./routes/dashboard/profile/profile.tsx"),
    route("job/create", "./routes/dashboard/job/index.tsx"),
    route("job/apply/:id", "./routes/dashboard/job/apply.tsx"),
    layout("./routes/dashboard/profile/complete.tsx", [
      ...prefix("complete-profile/core-information", [
        index("./routes/dashboard/profile/information.tsx"),
      ]),
      route(
        "complete-profile/availability",
        "./routes/dashboard/profile/availability.tsx"
      ),
      route(
        "complete-profile/details",
        "./routes/dashboard/profile/details.tsx"
      ),
      route(
        "complete-profile/portfolio",
        "./routes/dashboard/profile/portfolio.tsx"
      ),
      route(
        "complete-profile/readiness-quiz",
        "./routes/dashboard/profile/quiz.tsx"
      ),
    ]),
  ]),
  route("onboarding", "./routes/onboarding/index.tsx", [
    route("get-started", "./routes/onboarding/get-started.tsx"),
    route("option", "./routes/onboarding/option.tsx"),
    route("signin", "./routes/onboarding/login.tsx"),
    // route("register/:type?", "./routes/onboarding/register.tsx"),
    route("signup", "./routes/onboarding/signup.tsx"),
    route("verify", "./routes/onboarding/verify-code.tsx"),
    // route("google/callback", "./routes/onboarding/google-callback.tsx"),
    route(
      "company-verification",
      "./routes/onboarding/company-verification.tsx"
    ),
  ]),
  route("invite/:code", "./routes/invite.tsx"),
] satisfies RouteConfig;
