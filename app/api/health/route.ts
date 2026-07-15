export async function GET() {
  return Response.json({ status: 'ok', app: 'MetaForge', timestamp: new Date().toISOString() })
}
