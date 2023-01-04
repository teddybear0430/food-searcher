import React from 'react';
import { app } from '~/constants/app';
import Link from 'next/link';

const Footer: React.FC = () => {
  const LINKS = [
    {
      text: 'プライバシーポリシー',
      href: '/privacy-policy',
    },
    {
      text: '利用規約',
      href: '/terms',
    },
  ] as const;

  return (
    <footer className="text-center text-gray-500 mt-10 p-4 mr-[calc(50%-50vw)] ml-[calc(50%-50vw)] bg-gray-50">
      <ul className="mb-4">
        {LINKS.map((link) => (
          <li key={link.text} className="inline-block first-of-type:pr-4">
            <Link href={link.href} className="hover:text-gray-600 hover:underline">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-sm mb-2">
        <span className="text-sm">
          {new Date().getFullYear()} {app.name} Powered by{' '}
          <a href="http://webservice.recruit.co.jp/" className="hover:text-gray-600 hover:underline">
            ホットペッパー Webサービス
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
