import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { domain, serverIp } = await request.json()

  // This is where you would typically interact with your backend service
  // For this example, we'll just create a mock generated URL
  const generatedUrl = `https://${domain.replace(/[^a-zA-Z0-9]/g, '-')}.avoidns.com`

  return NextResponse.json({ generatedUrl })
}
