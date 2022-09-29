import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { useState } from 'react';
import React from 'react';

export default function Exchanges() {
    const [open, setIsOpen] = useState(false);
    const openForm = () => setIsOpen(true);

    return (
        <Layout>
            <Head>
                <title>Exchanges</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <button> + Add Binance Exchange</button>
                <form>
                    <fieldset>
                        <label>
                            <p>API Key</p>
                            <input name="apiKey" />
                        </label>
                    </fieldset>
                    <fieldset>
                        <label>
                            <p>Secret Key</p>
                            <input name="secretKey" />
                        </label>
                    </fieldset>

                    <button type="submit">Connect</button>
                </form>
            </section>
        </Layout>
    )
}
