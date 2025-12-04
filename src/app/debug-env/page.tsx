
"use client";
import React, { useEffect, useState } from 'react';

const DebugEnv = () => {
    const [envInfo, setEnvInfo] = useState<any>({});

    useEffect(() => {
        setEnvInfo({
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        });
    }, []);

    return (
        <div style={{ padding: '40px', fontFamily: 'monospace' }}>
            <h1>Environment Variable Debugger</h1>
            <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
                <p><strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {envInfo.url ? envInfo.url : <span style={{ color: 'red' }}>MISSING</span>}</p>
                <p><strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> {envInfo.key ? `${envInfo.key.substring(0, 10)}...` : <span style={{ color: 'red' }}>MISSING</span>}</p>
            </div>
            <p style={{ marginTop: '20px' }}>
                If these are RED/MISSING, then the variables were not present during the Docker Build.
            </p>
        </div>
    );
};

export default DebugEnv;
