import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Notun Digonto',description:'Notun Digonto Savings Society Management'};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="bn"><body>{children}</body></html>}
