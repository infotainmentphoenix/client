export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export async function GET() {
  try {
    let output = '';
    try {
      const { stdout, stderr } = await execAsync('npx.cmd prisma generate', { cwd: 'D:/Project/PhoenixInfotainment/PHONEIX_BACKEND' });
      output = `STDOUT: ${stdout} STDERR: ${stderr}`;
    } catch(ex: any) {
      output = `EXEC ERROR: ${ex.message}`;
    }
    
    
    const filePath = 'D:/Project/PhoenixInfotainment/PHONEIX_BACKEND/src/server.ts';
    const time = new Date();
    try {
        await fs.utimes(filePath, time, time);
    } catch(e) {
        
    }

    return NextResponse.json({ status: 200, message: 'Done', output });
  } catch (e: any) {
    return NextResponse.json({ status: 200, error: e.message });
  }
}
