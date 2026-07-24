# Agent Guidelines

## Development Workflow
1. **Explore First**: Read existing code/schemas before implementing new service methods or editing UI components.
2. **Implement**: Create/edit code precisely. Prefer targeted `edit` tool calls with exact search/replace.
3. **Verify**: Ensure that pages load correctly, state management functions, and components render with fallback data.
4. **Update Memory**: ALWAYS update `/history/state-development.md` and `/history/history-chat.md` before concluding a task, switching branches, or finishing an agent session.

## Coding Standards
- **Clean TypeScript**: Ensure types are fully declared; avoid unnecessary `any`.
- **Component Integrity**: Keep UI components decoupled from specific service implementations where possible, using helper wrappers.
- **Fail-safe Backend Calls**: Wrap all Supabase database queries in the `safeQuery` pattern to guarantee page load stability.
- **Minimalist Styling**: Keep existing Tailwind utility rules; match standard design systems of the app.
- **No Unused Comments**: Omit trivial comments ("defines a button", "sets active tab"). Document only non-obvious hacks or design constraints.

## Things to Avoid
- Avoid adding redundant dependency packages without confirming compatibility.
- Do not bypass linter/TS rules (e.g. do not use `@ts-ignore` indiscriminately).
- Avoid changing or overwriting mockup data constants unless specifically requested.
