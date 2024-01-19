import { Price } from '@/types'

export const getURL = () => {
  let url = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  url = url.includes('http') ? url : `https://${url}`;
  return (url.charAt(url.length - 1) === '/' )? url : `${url}/`;
}

export const postData = async (url: string, data: {price: Price}) => {
  // comes from node docs
  console.log('POST REQUEST:', url, data);
  const res: Response = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json'}),
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    console.log('Error in POST', { url, data, res })
    throw new Error(res.statusText);
  } else return res.json();
}

export const toDateTime = (seconds: number) => {
  var t = new Date('1970-01-01T00:30:00Z');
  t.setSeconds(seconds);
  return t;
}