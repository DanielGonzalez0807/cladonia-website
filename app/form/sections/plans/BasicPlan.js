export default function BasicPlan({ 
  plans, 
  activities, 
  selectedActivity, 
  childrenCount, 
  adults, 
  seniors, 
  foreigners, 
  guideRates, 
  vehicleCounts, 
  setVehicleCounts, 
  formatPrice, 
  watch 
}) {
  const childrenCountNum = parseInt(childrenCount) || 0;
  const adultsCount = parseInt(adults) || 0;
  const seniorsCount = parseInt(seniors) || 0;
  const foreignersCount = parseInt(foreigners) || 0;
  const totalVisitors = childrenCountNum + adultsCount + seniorsCount + foreignersCount;
  
  const parkEntryRates = { exempt: 0, student: 24500, adult: 29000, foreigner: 78500 };
  const insurancePerPerson = 10000;
  const guideRate = guideRates[selectedActivity] || 0;
  
  const exemptEntry = seniorsCount * parkEntryRates.exempt;
  const studentEntry = childrenCountNum * parkEntryRates.student;
  const adultEntry = adultsCount * parkEntryRates.adult;
  const foreignerEntry = foreignersCount * parkEntryRates.foreigner;
  
  const exemptInsurance = seniorsCount * insurancePerPerson;
  const studentInsurance = childrenCountNum * insurancePerPerson;
  const adultInsurance = adultsCount * insurancePerPerson;
  const foreignerInsurance = foreignersCount * insurancePerPerson;
  
  const totalEntry = exemptEntry + studentEntry + adultEntry + foreignerEntry;
  const totalInsurance = totalVisitors * insurancePerPerson;
  const totalVehicles = (vehicleCounts.car * 21000) + (vehicleCounts.minibus * 54000) + (vehicleCounts.bus * 113000);

  const guidesRequired = totalVisitors > 0
  ? Math.ceil(totalVisitors / 10)
  : 0;

  const totalGuideCost = guidesRequired * guideRate;

  const totalBasic = totalEntry + totalInsurance + totalGuideCost + totalVehicles;

  const formatThousandsK = (value) => {
  if (!value) return "0K";
  return `${Math.round(value / 1000)}K`;
};


  return (
    <div className="mt-6 p-6 bg-gray-800/60 border-2 border-yellow-400 rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h4 className="text-3xl font-bold text-white">{plans.basic.name}</h4>
          <p className="text-yellow-400 text-xl font-bold">{plans.basic.subtitle}</p>
        </div>
        <div className="text-right bg-gray-700/50 border border-gray-600 px-3 py-2 rounded">
          <p className="text-yellow-400 font-bold text-xs mb-1">Fecha</p>
          <p className="text-white font-bold text-base">{watch('date') ? new Date(watch('date')).toLocaleDateString('es-CO') : 'No seleccionada'}</p>
        </div>
      </div>
      
      {/* Destino y Sendero */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-gray-700/50 border border-gray-600 p-2 rounded text-center">
          <span className="text-gray-400 text-xs block mb-1">Destino</span>
          <span className="text-white font-semibold text-sm">PNN CHINGAZA</span>
        </div>
        <div className="bg-gray-700/50 border border-gray-600 p-2 rounded text-center">
          <span className="text-gray-400 text-xs block mb-1">Actividad</span>
          <span className="text-white font-semibold text-sm">{activities['PNN CHINGAZA'].find(a => a.value === selectedActivity)?.label}</span>
        </div>
      </div>
      
      {/* Tarifas de entrada */}
      <div className="bg-gray-700/50 border border-gray-600 p-4 rounded mb-5">
        <p className="text-white font-semibold mb-3 text-center">Tarifas de entrada al parque</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
            <p className="text-yellow-400 font-bold text-xs mb-1">Exento</p>
            <p className="text-white font-bold text-lg">Gratis</p>
          </div>
          <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
            <p className="text-yellow-400 font-bold text-xs mb-1">Estudiantes</p>
            <p className="text-white font-bold text-lg">$24.5K</p>
          </div>
          <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
            <p className="text-yellow-400 font-bold text-xs mb-1">Adultos</p>
            <p className="text-white font-bold text-lg">$29K</p>
          </div>
          <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
            <p className="text-yellow-400 font-bold text-xs mb-1">Extranjeros</p>
            <p className="text-white font-bold text-lg">$78.5K</p>
          </div>
        </div>
      </div>
      
      {/* Póliza y Guía */}
      <div className="bg-gray-700/50 border border-gray-600 p-4 rounded mb-5 flex flex-row justify-between items-center">
        <div>
          <span className="text-yellow-400 font-bold text-sm block mb-1">Póliza x persona</span>
        </div>
        <div>
          <span className="text-white font-bold text-2xl">$10K</span>
        </div>
      </div>
      <div className="bg-gray-700/50 border border-gray-600 p-4 rounded mb-5 flex flex-row justify-between items-center">
        <div>
          <span className="text-yellow-400 font-bold text-lg block mb-1">Guía</span>
          <p className="text-white text-sm font-bold">1 x cada 10 visitantes</p>
        </div>
      <div className="flex flex-col items-end">
        <span className="text-white font-bold text-2xl">
          {formatThousandsK(totalGuideCost)}
        </span>
        {guidesRequired > 1 && (
          <p className="text-yellow-400 text-m mt-1 font-bold">
            {guidesRequired} guías requeridos
          </p>
        )}
      </div>

      </div>
      
      {/* Desglose por visitante */}
      {totalVisitors > 0 && (
        <div className="bg-gray-700/50 border border-gray-600 p-4 rounded mb-5">
          <p className="text-white font-semibold mb-3 text-center">Desglose por tipo de visitante</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {seniorsCount > 0 && (
              <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
                <p className="text-yellow-400 font-bold text-sm mb-1">Exentos x{seniorsCount}</p>
                <p className="text-white font-bold text-xl mb-1">${exemptEntry.toLocaleString()}</p>
                <p className="text-white font-semibold text-xs">+ Póliza ${exemptInsurance.toLocaleString()}</p>
              </div>
            )}
            {childrenCountNum > 0 && (
              <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
                <p className="text-yellow-400 font-bold text-sm mb-1">Estudiantes x{childrenCountNum}</p>
                <p className="text-white font-bold text-xl mb-1">${studentEntry.toLocaleString()}</p>
                <p className="text-white font-semibold text-xs">+ Póliza ${studentInsurance.toLocaleString()}</p>
              </div>
            )}
            {adultsCount > 0 && (
              <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
                <p className="text-yellow-400 font-bold text-sm mb-1">Adultos x{adultsCount}</p>
                <p className="text-white font-bold text-xl mb-1">${adultEntry.toLocaleString()}</p>
                <p className="text-white font-semibold text-xs">+ Póliza ${adultInsurance.toLocaleString()}</p>
              </div>
            )}
            {foreignersCount > 0 && (
              <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
                <p className="text-yellow-400 font-bold text-sm mb-1">Extranjeros x{foreignersCount}</p>
                <p className="text-white font-bold text-xl mb-1">${foreignerEntry.toLocaleString()}</p>
                <p className="text-white font-semibold text-xs">+ Póliza ${foreignerInsurance.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Transporte NO incluido */}
      <div className="bg-red-500/10 border border-red-500 p-4 rounded mb-5 text-center">
        <p className="text-red-400 text-lg font-bold mb-1">⚠️ Este plan NO incluye transporte</p>
        <p className="text-yellow-400 text-sm">Debes gestionar tu propio transporte al parque</p>
      </div>
      
      {/* Derecho de ingreso vehículo */}
      <div className="bg-gray-700/50 border border-gray-600 p-4 rounded mb-5">
        <p className="text-white font-semibold mb-3 text-center">Derecho de ingreso por vehículo</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
            <p className="text-yellow-400 font-bold text-sm mb-2">Automóvil</p>
            <input 
              type="number" 
              min="0"
              value={vehicleCounts.car}
              onChange={(e) => setVehicleCounts({...vehicleCounts, car: parseInt(e.target.value) || 0})}
              className="w-12 mx-auto mb-2 px-1 py-1 rounded bg-white text-black text-center text-sm border border-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
            <p className="text-white font-bold text-lg">$21K</p>
            {vehicleCounts.car > 0 && <p className="text-yellow-400 font-semibold text-xs mt-1">Total: ${(vehicleCounts.car * 21000).toLocaleString()}</p>}
          </div>
          <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
            <p className="text-yellow-400 font-bold text-sm mb-2">Microbus</p>
            <input 
              type="number" 
              min="0"
              value={vehicleCounts.minibus}
              onChange={(e) => setVehicleCounts({...vehicleCounts, minibus: parseInt(e.target.value) || 0})}
              className="w-12 mx-auto mb-2 px-1 py-1 rounded bg-white text-black text-center text-sm border border-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
            <p className="text-white font-bold text-lg">$54K</p>
            {vehicleCounts.minibus > 0 && <p className="text-yellow-400 font-semibold text-xs mt-1">Total: ${(vehicleCounts.minibus * 54000).toLocaleString()}</p>}
          </div>
          <div className="bg-gray-800/60 border border-gray-600 p-3 rounded text-center">
            <p className="text-yellow-400 font-bold text-sm mb-2">Bus</p>
            <input 
              type="number" 
              min="0"
              value={vehicleCounts.bus}
              onChange={(e) => setVehicleCounts({...vehicleCounts, bus: parseInt(e.target.value) || 0})}
              className="w-12 mx-auto mb-2 px-1 py-1 rounded bg-white text-black text-center text-sm border border-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
            <p className="text-white font-bold text-lg">$113K</p>
            {vehicleCounts.bus > 0 && <p className="text-yellow-400 font-semibold text-xs mt-1">Total: ${(vehicleCounts.bus * 113000).toLocaleString()}</p>}
          </div>
        </div>
      </div>
      
      {/* Total */}
      <div className="bg-yellow-400/20 border-2 border-yellow-400 rounded p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white font-semibold">Total Plan Básico</p>
            <p className="text-yellow-400 text-xs">IVA incluido</p>
            <p className="text-white text-m">{totalVisitors} visitante{totalVisitors !== 1 ? 's' : ''}</p>
          </div>
          <p className="text-yellow-400 font-bold text-4xl">{formatPrice(totalBasic)}</p>
        </div>
      </div>
    </div>
  );
}
