import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import clients from '../../../clients.json';
import { getSheetData } from '../../../lib/googleSheets';

export async function GET(request: NextRequest) {
  try {
    // Get clientId from query params
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');

    if (!clientId) {
      return NextResponse.json(
        { error: 'clientId is required' },
        { status: 400 }
      );
    }

    // Get client config
    const clientConfig = clients[clientId as keyof typeof clients];
    if (!clientConfig) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = clientConfig.sheetId;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:G',
    });

    const rows = response.data.values || [];
    const headers = rows[0];
    const data = rows.slice(1);

    const calls = data.map((row, index) => ({
      id: index + 1,
      date: row[0] || '',
      time: row[1] || '',
      caller: row[2] || '',
      status: row[3] || '',
      duration: row[4] || '',
      outcome: row[5] || '',
      revenue: parseFloat(row[6]) || 0,
    }));

    const totalCalls = calls.length;
    const newPatients = calls.filter((c) => c.outcome === 'New Patient').length;
    const totalRevenue = calls.reduce((sum, c) => sum + c.revenue, 0);

    return NextResponse.json({
      client: clientConfig,
      totalCalls,
      newPatients,
      totalRevenue,
      calls: calls.slice(0, 10),
    });
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Google Sheets' },
      { status: 500 }
    );
  }
}
