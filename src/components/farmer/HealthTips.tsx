
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockHealthTips } from '../../data/mockData';

export function HealthTips() {
  const [language, setLanguage] = useState<'en' | 'pidgin'>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // TODO: Replace with real API call
  const tips = mockHealthTips.filter(tip => 
    tip.language === language && 
    (selectedCategory === 'all' || tip.category === selectedCategory)
  );

  const categories = ['all', ...Array.from(new Set(mockHealthTips.map(tip => tip.category)))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health Tips</h1>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Learn how to keep your animals healthy' 
              : 'Learn how to keep your animal dem healthy'
            }
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={language === 'en' ? 'default' : 'outline'} 
            onClick={() => setLanguage('en')}
            size="sm"
          >
            English
          </Button>
          <Button 
            variant={language === 'pidgin' ? 'default' : 'outline'} 
            onClick={() => setLanguage('pidgin')}
            size="sm"
          >
            Pidgin
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Badge 
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-primary/80"
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? 'All Topics' : category}
          </Badge>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <Card key={tip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {tip.image && (
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${tip.image})` }} />
            )}
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{tip.title}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {tip.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">{tip.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {tips.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">
              {language === 'en' 
                ? 'No tips found for this category.' 
                : 'No tips dey for this category.'
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Emergency Contact */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-red-800 mb-2">
            {language === 'en' ? 'Emergency Contact' : 'Emergency Contact'}
          </h3>
          <p className="text-red-700 mb-3">
            {language === 'en' 
              ? 'If your animal is in critical condition, contact emergency veterinary services immediately:'
              : 'If your animal dey serious condition, call emergency vet service quick quick:'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="destructive" size="sm">
              📞 Emergency: +237 233 XX XXXX
            </Button>
            <Button variant="outline" size="sm">
              🚑 24/7 Animal Hospital
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
