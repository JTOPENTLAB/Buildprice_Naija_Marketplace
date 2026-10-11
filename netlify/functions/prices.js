
exports.handler = async (event) => {
  // Proxy to Render backend
  const res = await fetch(`https://buildprice-naija-backend.onrender.com/api/prices?city=${event.queryStringParameters?.city || 'Lagos State'}`);
  const data = await res.json();
  return { statusCode: 200, body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } };
};
