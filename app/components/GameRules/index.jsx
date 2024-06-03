import rules from './rules';

const GameRules = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center mt-10 font-bRiver">Règles du jeu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {rules.map((rule, index) => (
          <div key={index} className="card bg-white shadow-md rounded-lg p-8 col-span-1">
            <h2 className="text-2xl font-bold font-mono text-center mb-2">{rule.title}</h2>
            <p className="text-center leading-relaxed">{rule.description}</p>
            {rule.steps && (
              <ul className="list-disc list-inside ml-5">
                {rule.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameRules;
