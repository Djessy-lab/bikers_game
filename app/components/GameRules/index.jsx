import rules from './rules';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const GameRules = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl text-center mt-10 font-bRiver">Règles du jeu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {rules.map((rule, index) => (
          <Card key={index} className="shadow-md hover:transform hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-center mb-2 font-mono text-xl">{rule.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center leading-relaxed font-light">
              {rule.description}
              {rule.steps && (
                <ul className="list-disc list-inside ml-5">
                  {rule.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default GameRules;
