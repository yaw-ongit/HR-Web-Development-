export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    app: 'enterprise-hris-foundation',
  })
}
