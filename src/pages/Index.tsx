import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 50 });
  const [logoVelocity, setLogoVelocity] = useState({ x: 2, y: 1.5 });
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoPosition(prev => {
        let newX = prev.x + logoVelocity.x;
        let newY = prev.y + logoVelocity.y;
        let newVelX = logoVelocity.x;
        let newVelY = logoVelocity.y;

        if (newX <= 0 || newX >= window.innerWidth - 100) {
          newVelX = -newVelX;
          newX = newX <= 0 ? 0 : window.innerWidth - 100;
        }
        if (newY <= 0 || newY >= window.innerHeight - 100) {
          newVelY = -newVelY;
          newY = newY <= 0 ? 0 : window.innerHeight - 100;
        }

        setLogoVelocity({ x: newVelX, y: newVelY });
        return { x: newX, y: newY };
      });
    }, 20);

    return () => clearInterval(interval);
  }, [logoVelocity]);

  const recyclingPoints = [
    { name: 'Экопункт "Чистый город"', address: 'ул. Ленина, 1', lat: 54.9885, lng: 73.3242 },
    { name: 'Пункт приёма "ЭкоОмск"', address: 'пр. Мира, 25', lat: 54.9924, lng: 73.3686 },
    { name: 'Рециклинг-центр "Зелёный мир"', address: 'ул. Карла Маркса, 45', lat: 54.9848, lng: 73.3674 },
    { name: 'Приём вторсырья "ЭкоЛайф"', address: 'ул. Лермонтова, 170', lat: 54.9667, lng: 73.3833 }
  ];

  const vipProducts = [
    { id: 1, name: '🌟 VIP Эко-Статус', price: 500, description: 'Почётное звание "Спаситель планеты"', features: ['Именной сертификат', 'Зелёный значок в профиле', 'Бесплатный мусорный пакет'] },
    { id: 2, name: '💎 Мусорный Король', price: 1500, description: 'Элитный доступ к вывозу мусора', features: ['Личный мусоровоз', 'Золотой контейнер', 'Круглосуточная поддержка'] },
    { id: 3, name: '🚀 Космический Утилизатор', price: 5000, description: 'Отправим ваш мусор в космос!*', features: ['Сертификат NASA*', 'Видео запуска', '*Условно отправим'] }
  ];

  const handleMapClick = (point: typeof recyclingPoints[0]) => {
    const yandexUrl = `https://yandex.ru/maps/?text=${point.lat},${point.lng}`;
    const googleUrl = `https://www.google.com/maps/search/?api=1&query=${point.lat},${point.lng}`;
    
    if (confirm(`Открыть ${point.name} в картах?\n\nНажмите ОК для Яндекс.Карт\nОтмена для Google Maps`)) {
      window.open(yandexUrl, '_blank');
    } else {
      window.open(googleUrl, '_blank');
    }
  };

  const handlePayment = (productName: string) => {
    toast({
      title: "💳 Оплата",
      description: (
        <div className="space-y-2">
          <p>Товар: {productName}</p>
          <p className="font-mono text-sm">Карта: 2202 2081 1781 4872</p>
          <p className="text-xs">Отправьте чек в Telegram: @h9umi</p>
          <p className="text-xs text-muted-foreground">После проверки товар будет активирован автоматически!</p>
        </div>
      ),
      duration: 10000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 relative overflow-hidden">
      <div
        className="fixed z-50 cursor-pointer transition-transform hover:scale-110"
        style={{
          left: `${logoPosition.x}px`,
          top: `${logoPosition.y}px`,
          pointerEvents: 'none'
        }}
      >
        <img 
          src="https://cdn.poehali.dev/files/5c13cda0-057a-4172-9344-86b6adaf766c.jpeg"
          alt="Logo"
          className="w-24 h-24 drop-shadow-2xl animate-pulse"
        />
      </div>

      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl">
                <Icon name="Trash2" className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Мусор Вокруг Нас
                </h1>
                <p className="text-sm text-muted-foreground">Превращаем проблему в решение! 🌍</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2 animate-bounce">
              <Icon name="Sparkles" className="mr-2" size={20} />
              Проект 2025
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-20">
        <section className="text-center space-y-6 animate-fade-in">
          <div className="inline-block">
            <Badge className="text-lg px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">
              <Icon name="AlertTriangle" className="mr-2" size={24} />
              ПРОБЛЕМА ТРЕБУЕТ РЕШЕНИЯ!
            </Badge>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent leading-tight">
            Мусор — это НЕ мусор!
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Каждый год человечество производит <span className="font-bold text-red-600">2 миллиарда тонн</span> отходов. 
            Но что если мы скажем вам, что 75% этого мусора можно переработать? 🔄
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <Card className="border-4 border-red-200 hover:shadow-2xl transition-all hover:-translate-y-2">
            <CardHeader>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Icon name="Skull" className="text-red-600" size={32} />
              </div>
              <CardTitle className="text-2xl">Проблема серьёзна</CardTitle>
              <CardDescription className="text-base">Факты, которые пугают</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Icon name="TrendingUp" className="text-red-500 mt-1" size={20} />
                <p>Каждую минуту в океан попадает 1 грузовик пластика</p>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Clock" className="text-orange-500 mt-1" size={20} />
                <p>Пластиковая бутылка разлагается 450 лет</p>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Wind" className="text-gray-500 mt-1" size={20} />
                <p>92% мусора сжигается, загрязняя воздух</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-yellow-200 hover:shadow-2xl transition-all hover:-translate-y-2">
            <CardHeader>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Icon name="Lightbulb" className="text-yellow-600" size={32} />
              </div>
              <CardTitle className="text-2xl">Решение есть!</CardTitle>
              <CardDescription className="text-base">Что мы можем сделать</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Icon name="Recycle" className="text-green-500 mt-1" size={20} />
                <p>Сортируй мусор — это просто и эффективно</p>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="ShoppingBag" className="text-blue-500 mt-1" size={20} />
                <p>Используй многоразовые сумки и бутылки</p>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Users" className="text-purple-500 mt-1" size={20} />
                <p>Присоединяйся к эко-движениям</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-green-200 hover:shadow-2xl transition-all hover:-translate-y-2">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Icon name="Target" className="text-green-600" size={32} />
              </div>
              <CardTitle className="text-2xl">Наша миссия</CardTitle>
              <CardDescription className="text-base">Что мы делаем</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Icon name="BookOpen" className="text-indigo-500 mt-1" size={20} />
                <p>Образовательные программы в школах</p>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="MapPin" className="text-red-500 mt-1" size={20} />
                <p>Карты пунктов утилизации</p>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="Heart" className="text-pink-500 mt-1" size={20} />
                <p>Мотивация через геймификацию</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <Badge className="text-lg px-6 py-2 mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
              <Icon name="Map" className="mr-2" size={20} />
              ИНТЕРАКТИВНАЯ КАРТА
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Где сдать мусор в Омске? 📍</h2>
            <p className="text-lg text-muted-foreground">Нажми на точку, чтобы открыть в картах!</p>
          </div>

          <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 min-h-[400px]">
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iZ3JheSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] rounded-2xl" />
            
            <div className="relative grid md:grid-cols-2 gap-6">
              {recyclingPoints.map((point, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-xl transition-all hover:scale-105 border-2 border-green-300 bg-white"
                  onClick={() => handleMapClick(point)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-500 text-white p-3 rounded-full">
                        <Icon name="MapPin" size={24} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{point.name}</CardTitle>
                        <CardDescription className="text-sm">{point.address}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full group">
                      Открыть в картах
                      <Icon name="ExternalLink" className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <Badge className="text-xl px-8 py-3 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 animate-pulse">
              <Icon name="Crown" className="mr-2" size={24} />
              VIP МАГАЗИН
            </Badge>
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Стань легендой утилизации! 🏆
            </h2>
            <p className="text-xl text-muted-foreground">Эксклюзивные предложения для настоящих эко-героев</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {vipProducts.map((product) => (
              <Card key={product.id} className="border-4 border-purple-300 bg-white hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500" />
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{product.name.split(' ')[0]}</div>
                  <CardTitle className="text-2xl">{product.name.substring(2)}</CardTitle>
                  <CardDescription className="text-base mt-2">{product.description}</CardDescription>
                  <div className="text-4xl font-bold text-green-600 mt-4">{product.price} ₽</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="CheckCircle2" className="text-green-500 mt-1 flex-shrink-0" size={20} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => handlePayment(product.name)}
                  >
                    <Icon name="CreditCard" className="mr-2" size={20} />
                    Купить сейчас!
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-yellow-50 border-4 border-yellow-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Icon name="Info" className="text-blue-600" size={24} />
                Как получить VIP-статус?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge className="bg-purple-600 text-white">1</Badge>
                <p>Выбери свой VIP-пакет</p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-purple-600 text-white">2</Badge>
                <p>Переведи оплату на карту: <span className="font-mono font-bold">2202 2081 1781 4872</span></p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-purple-600 text-white">3</Badge>
                <p>Отправь чек в Telegram: <a href="https://t.me/h9umi" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold">@h9umi</a></p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-green-600 text-white">✓</Badge>
                <p className="font-bold text-green-700">Твой товар будет активирован автоматически в течение 24 часов!</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-6xl mb-6">🌱</div>
            <h2 className="text-4xl font-bold mb-4">Присоединяйся к движению!</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Вместе мы можем изменить мир к лучшему. Каждое маленькое действие имеет значение!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-600">
                <Icon name="Users" className="mr-2" size={24} />
                Стать волонтёром
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Icon name="Mail" className="mr-2" size={24} />
                Подписаться на новости
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Icon name="Share2" className="mr-2" size={24} />
                Поделиться проектом
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="flex justify-center gap-6 text-4xl">
            <span>♻️</span>
            <span>🌍</span>
            <span>💚</span>
            <span>🌿</span>
          </div>
          <h3 className="text-2xl font-bold">Мусор Вокруг Нас</h3>
          <p className="text-green-200">Превращаем проблему в возможность</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="secondary">Проект 2025</Badge>
            <Badge variant="secondary">Омск</Badge>
            <Badge variant="secondary">Экология</Badge>
            <Badge variant="secondary">Будущее</Badge>
          </div>
          <p className="text-sm text-green-300 mt-8">
            © 2025 Мусор Вокруг Нас. Все права защищены. Сделано с 💚 для планеты Земля
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
