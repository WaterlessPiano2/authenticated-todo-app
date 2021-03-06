export default function EORI({ result }) {
  const eori = JSON.parse(result).eori;
  return (
    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-lg font-medium text-gray-500">The EORI is valid</dt>
      <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
        {eori}
      </dd>
    </div>
  );
}
