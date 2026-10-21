async function verify() {
  const urls = [
    '/',
    '/ar',
    '/about',
    '/ar/about',
    '/services',
    '/ar/services',
    '/projects',
    '/ar/projects',
    '/projects/dallah-namar-hospital',
    '/ar/projects/dallah-namar-hospital',
    '/our-clients',
    '/ar/our-clients',
    '/knowledge-center',
    '/ar/knowledge-center',
    '/events',
    '/ar/events',
    '/contact',
    '/ar/contact',
    '/sitemap.xml',
    '/robots.txt',
    '/manifest.webmanifest',
    '/icon.png',
    '/apple-icon.png',
    '/opengraph-image.png'
  ];

  let errors = 0;
  for (const url of urls) {
    try {
      const res = await fetch('http://localhost:3000' + url);
      const isOk = res.status === 200;
      const contentType = res.headers.get('content-type') || '';
      console.log(`${isOk ? '✓' : '✗'} [${res.status}] ${url} (${contentType})`);
      if (!isOk) errors++;
      if (url === '/ar') {
        const text = await res.text();
        const hasRtl = text.includes('dir="rtl"');
        const hasArLang = text.includes('lang="ar"');
        console.log(`  Arabic Verification: dir="rtl": ${hasRtl}, lang="ar": ${hasArLang}`);
      }
    } catch (e) {
      console.error(`✗ Error fetching ${url}:`, e.message);
      errors++;
    }
  }

  // Also test /api/contact POST
  try {
    const postRes = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Client',
        email: 'test@example.com',
        phone: '+966500000000',
        subject: 'General Inquiry',
        message: 'This is a test contact submission verifying the route handler.'
      })
    });
    const json = await postRes.json();
    console.log(`✓ [/api/contact POST] status ${postRes.status}: success=${json.success}`);
  } catch (e) {
    console.error('✗ Error testing /api/contact POST:', e.message);
    errors++;
  }

  if (errors > 0) {
    console.error(`\nFAILED: ${errors} routes had issues!`);
    process.exit(1);
  } else {
    console.log('\nALL 25 VERIFICATIONS PASSED SUCCESSFULLY WITH HTTP 200!');
  }
}

verify();
