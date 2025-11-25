import { useState, useEffect } from 'react'
import { Coins, Gift, Trophy, Star, Zap, Users, CheckCircle2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import BottomNav from '@/components/BottomNav'
import LoadingSpinner from '@/components/LoadingSpinner'
import SkeletonCard from '@/components/SkeletonCard'
import Confetti from '@/components/Confetti'
import CoinAnimation from '@/components/CoinAnimation'
import { useAuthStore } from '@/store/auth-store'
import { triggerHaptic, triggerNotification } from '@/lib/telegram'

interface Task {
  _id: string
  title: string
  description: string
  reward: number
  task_type: string // 'daily' | 'special'
  category: string
  action_type: string // 'external_link' | 'proof_submission' | 'auto_complete'
  action_url?: string
  status: string
}

interface TaskCompletion {
  _id: string
  task_id: string
  user_id: string
  status: string // 'pending' | 'approved' | 'rejected'
  proof_url?: string
  submitted_at: string
}

function TasksPage() {
  const { user, updateCoinBalance } = useAuthStore()
  const { toast } = useToast()
  const [tasks, setTasks] = useState<Task[]>([])
  const [completions, setCompletions] = useState<TaskCompletion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showCoinAnimation, setShowCoinAnimation] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [proofUrl, setProofUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const coins = user?.coin_balance || 0

  useEffect(() => {
    loadTasks()
    if (user) {
      loadCompletions()
    }
  }, [user])

  const loadTasks = async () => {
    try {
      setIsLoading(true)
      // Database bağlantısı olmadan örnek görevler
      const exampleTasks: Task[] = [
        {
          _id: '1',
          title: 'Günlük Bonus',
          description: 'Her gün 100 coin kazan',
          reward: 100,
          task_type: 'daily',
          category: 'bonus',
          action_type: 'auto_complete',
          status: 'active'
        },
        {
          _id: '2',
          title: 'Telegram Kanalına Katıl',
          description: 'Resmi Telegram kanalımıza katılın',
          reward: 200,
          task_type: 'special',
          category: 'social',
          action_type: 'external_link',
          action_url: 'https://t.me/eserkaraeskichat',
          status: 'active'
        },
        {
          _id: '3',
          title: 'Sponsor Ziyaret',
          description: 'Sponsor sitemizi ziyaret edin',
          reward: 150,
          task_type: 'daily',
          category: 'sponsor',
          action_type: 'proof_submission',
          status: 'active'
        }
      ]
      
      setTasks(exampleTasks)
    } catch (error) {
      console.error('Load tasks error:', error)
      toast({
        title: 'Hata',
        description: 'Görevler yüklenemedi',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loadCompletions = async () => {
    if (!user) return
    
    try {
      // Database bağlantısı olmadan boş completion listesi
      setCompletions([])
    } catch (error) {
      console.error('Load completions error:', error)
    }
  }

  const getTaskCompletion = (taskId: string) => {
    return completions.find(c => c.task_id === taskId)
  }

  const isTaskCompleted = (taskId: string) => {
    const completion = getTaskCompletion(taskId)
    return completion?.status === 'approved'
  }

  const isTaskPending = (taskId: string) => {
    const completion = getTaskCompletion(taskId)
    return completion?.status === 'pending'
  }

  const handleTaskAction = async (task: Task) => {
    if (!user) {
      toast({
        title: 'Giriş Gerekli',
        description: 'Görevi tamamlamak için giriş yapmalısınız',
        variant: 'destructive',
      })
      return
    }

    triggerHaptic('light')

    if (task.action_type === 'external_link') {
      // Open external link
      if (task.action_url) {
        window.open(task.action_url, '_blank')
      }
      // After opening, show proof dialog
      setSelectedTask(task)
    } else if (task.action_type === 'proof_submission') {
      // Open proof submission dialog
      setSelectedTask(task)
    } else if (task.action_type === 'auto_complete') {
      // Auto complete task
      await submitTaskCompletion(task)
    }
  }

  const submitTaskCompletion = async (task: Task, proof?: string) => {
    if (!user) return

    try {
      setIsSubmitting(true)

      // Database olmadan local storage'a kaydet
      const newCompletion: TaskCompletion = {
        _id: Date.now().toString(),
        task_id: task._id,
        user_id: user.uid,
        status: 'pending',
        proof_url: proof || '',
        submitted_at: new Date().toISOString(),
      }

      // Local completions'a ekle
      setCompletions(prev => [...prev, newCompletion])

      triggerHaptic('heavy')
      triggerNotification('success')

      toast({
        title: 'Başarılı!',
        description: 'Görev tamamlama isteğiniz gönderildi. Onay bekleniyor.',
      })

      // Close dialog
      setSelectedTask(null)
      setProofUrl('')
    } catch (error) {
      console.error('Submit task error:', error)
      toast({
        title: 'Hata',
        description: 'Görev gönderilemedi. Lütfen tekrar deneyin.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleProofSubmit = async () => {
    if (!selectedTask) return

    if (!proofUrl.trim()) {
      toast({
        title: 'Eksik Bilgi',
        description: 'Lütfen kanıt URL\'si giriniz',
        variant: 'destructive',
      })
      return
    }

    await submitTaskCompletion(selectedTask, proofUrl)
  }

  const dailyTasks = tasks.filter(t => t.task_type === 'daily')
  const specialTasks = tasks.filter(t => t.task_type === 'special')

  const getTaskIcon = (category: string) => {
    switch (category) {
      case 'bonus':
        return Gift
      case 'game':
        return Trophy
      case 'social':
        return Users
      case 'sponsor':
        return Star
      default:
        return Zap
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 pb-20">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-emerald-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Görevler</h1>
                <p className="text-xs text-emerald-300">Coin kazan</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 px-4 py-2 rounded-full border border-yellow-500/30 relative">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-lg font-bold text-yellow-300">{coins.toLocaleString()}</span>
              <CoinAnimation show={showCoinAnimation} amount={100} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Daily Tasks */}
        {dailyTasks.length > 0 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">Günlük Görevler</h2>
            </div>
            
            <div className="space-y-3">
              {dailyTasks.map((task) => {
                const Icon = getTaskIcon(task.category)
                const completed = isTaskCompleted(task._id)
                const pending = isTaskPending(task._id)
                
                return (
                  <Card 
                    key={task._id}
                    className={`bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-500/20 hover:border-emerald-400/40 transition-all hover-lift ${completed ? 'opacity-60' : ''}`}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${completed ? 'from-gray-500/20 to-gray-600/20 border-gray-500/30' : 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30'} flex items-center justify-center border`}>
                            {completed ? (
                              <CheckCircle2 className="w-6 h-6 text-gray-400" />
                            ) : (
                              <Icon className="w-6 h-6 text-emerald-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1">{task.title}</h3>
                            <p className="text-xs text-emerald-300 mb-2">{task.description}</p>
                            <div className="flex items-center gap-2">
                              <Coins className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm font-bold text-yellow-300">+{task.reward}</span>
                              {completed && (
                                <Badge variant="outline" className="ml-2 border-green-500/50 text-green-400">
                                  Tamamlandı
                                </Badge>
                              )}
                              {pending && (
                                <Badge variant="outline" className="ml-2 border-yellow-500/50 text-yellow-400">
                                  Onay Bekliyor
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        {!completed && !pending && (
                          <Button 
                            size="sm"
                            onClick={() => handleTaskAction(task)}
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/20 hover-scale"
                          >
                            Başlat
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Special Tasks */}
        {specialTasks.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Özel Görevler</h2>
            </div>
            
            <div className="space-y-3">
              {specialTasks.map((task) => {
                const Icon = getTaskIcon(task.category)
                const completed = isTaskCompleted(task._id)
                const pending = isTaskPending(task._id)
                
                return (
                  <Card 
                    key={task._id}
                    className={`bg-gradient-to-r from-yellow-900/20 to-amber-900/20 border-yellow-500/20 hover:border-yellow-400/40 transition-all hover-lift ${completed ? 'opacity-60' : ''}`}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${completed ? 'from-gray-500/20 to-gray-600/20 border-gray-500/30' : 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30'} flex items-center justify-center border`}>
                            {completed ? (
                              <CheckCircle2 className="w-6 h-6 text-gray-400" />
                            ) : (
                              <Icon className="w-6 h-6 text-yellow-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1">{task.title}</h3>
                            <p className="text-xs text-yellow-300 mb-2">{task.description}</p>
                            <div className="flex items-center gap-2">
                              <Coins className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm font-bold text-yellow-300">+{task.reward}</span>
                              {completed && (
                                <Badge variant="outline" className="ml-2 border-green-500/50 text-green-400">
                                  Tamamlandı
                                </Badge>
                              )}
                              {pending && (
                                <Badge variant="outline" className="ml-2 border-yellow-500/50 text-yellow-400">
                                  Onay Bekliyor
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        {!completed && !pending && (
                          <Button 
                            size="sm"
                            onClick={() => handleTaskAction(task)}
                            className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white shadow-lg shadow-yellow-500/20 hover-scale"
                          >
                            Başlat
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && tasks.length === 0 && (
          <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
            <div className="p-12 text-center">
              <Gift className="w-16 h-16 text-emerald-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-white mb-2">Henüz Görev Yok</h3>
              <p className="text-gray-400">Yeni görevler yakında eklenecek!</p>
            </div>
          </Card>
        )}
      </div>

      {/* Proof Submission Dialog */}
      <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
        <DialogContent className="bg-gradient-to-br from-emerald-900/95 to-teal-900/95 border-emerald-500/30 text-white">
          <DialogHeader>
            <DialogTitle>{selectedTask?.title}</DialogTitle>
            <DialogDescription className="text-emerald-300">
              {selectedTask?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {selectedTask?.action_type === 'external_link' && (
              <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                <p className="text-sm text-emerald-300 mb-2">
                  Görev sayfasını açtıktan sonra, ekran görüntüsü alıp URL'sini aşağıya yapıştırın.
                </p>
                {selectedTask.action_url && (
                  <a
                    href={selectedTask.action_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm"
                  >
                    Görev Sayfasını Aç <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="proof">Kanıt URL (Screenshot URL veya Link)</Label>
              <Input
                id="proof"
                value={proofUrl}
                onChange={(e) => setProofUrl(e.target.value)}
                placeholder="https://imgur.com/abc123 veya https://..."
                className="bg-black/40 border-emerald-500/30 text-white"
              />
              <p className="text-xs text-gray-400">
                Ekran görüntüsünü Imgur, ImgBB gibi sitelere yükleyip linki yapıştırabilirsiniz.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleProofSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
              </Button>
              <Button
                onClick={() => {
                  setSelectedTask(null)
                  setProofUrl('')
                }}
                variant="outline"
                className="border-emerald-500/30 text-white hover:bg-emerald-500/10"
              >
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  )
}

export default TasksPage
