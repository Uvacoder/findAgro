// useEffect
import { useEffect } from 'react'


// loadjs
import loadjs from 'loadjs'


// Head 
import Head from 'next/head'


function MyApp({ Component, pageProps }) {

  // init useEffect
  useEffect(() => {

    // init loadjs
    loadjs('/vendors/@popperjs/popper.min.js', () => {
      loadjs('/vendors/bootstrap/bootstrap.min.js', () => {
        loadjs('/vendors/is/is.min.js', () => {
          loadjs('https://polyfill.io/v3/polyfill.min.js?features=window.scroll', () => {
            loadjs('/vendors/fontawesome/all.min.js', () => {
              loadjs('/assets/js/theme.js')
            })
          })
        })
      })
    })

  }, [])


  return (
    <>

      <Head>

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>FindAgro</title>
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicons/favicon-16x16.png" />
        <link rel="shortcut icon" type="image/x-icon" href="/assets/img/favicons/favicon.ico" /> */}
        <link rel="manifest" href="/assets/img/favicons/manifest.json" />
        {/* <meta name="msapplication-TileImage" content="/assets/img/favicons/mstile-150x150.png" /> */}
        <meta name="theme-color" content="#ffffff" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&amp;family=Rubik:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet" />
        <link href="/assets/css/theme.css" rel="stylesheet" />
      </Head>

      <main className="main" id="top">
        <Component {...pageProps} />
      </main>

    </>
  )
}

export default MyApp
