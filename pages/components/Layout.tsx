import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
	children?: ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<div>
			<Head>
				<title>MyTemplate - sample page</title>
			</Head>

			<header className=''>
				<Link href='/'>
					Home
				</Link>
				<Link href='/signup'>
				  SignUp
				</Link>
				<Link href='/blogs/1'>
				  Blog single
				</Link>
			</header>

			<div className='content'>{children}</div>

			<footer className=''></footer>
		</div>
	);
};

export default Layout;
