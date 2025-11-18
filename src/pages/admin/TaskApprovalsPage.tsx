import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Check, X, ExternalLink, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockApprovals = [
  { 
    id: '1', 
    user: 'Ali_123', 
    task: 'Telegram Kanalına Katıl', 
    proof_url: 'https://example.com/proof1.jpg',
    submitted_at: '2024-01-20T10:30:00Z',
    status: 'pending'
  },
  { 
    id: '2', 
    user: 'Mehmet_77', 
    task: '3 Arkadaş Davet Et', 
    proof_url: 'https://example.com/proof2.jpg',
    submitted_at: '2024-01-20T09:15:00Z',
    status: 'pending'
  },
  { 
    id: '3', 
    user: 'Ayşe_99', 
    task: 'Instagram Takip Et', 
    proof_url: 'https://example.com/proof3.jpg',
    submitted_at: '2024-01-20T08:45:00Z',
    status: 'pending'
  },
];

export default function TaskApprovalsPage() {
  const [approvals, setApprovals] = useState(mockApprovals);
  const { toast } = useToast();

  const handleApprove = (id: string, user: string) => {
    setApprovals(approvals.filter(a => a.id !== id));
    toast({
      title: 'Görev Onaylandı',
      description: `${user} kullanıcısının görevi onaylandı`,
    });
  };

  const handleReject = (id: string, user: string) => {
    setApprovals(approvals.filter(a => a.id !== id));
    toast({
      variant: 'destructive',
      title: 'Görev Reddedildi',
      description: `${user} kullanıcısının görevi reddedildi`,
    });
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Görev Onay Sistemi</h1>
        <p className="text-emerald-300">Kullanıcı görev tamamlamalarını onaylayın</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{approvals.length}</h3>
            <p className="text-sm text-emerald-300/80">Bekleyen Onay</p>
          </CardContent>
        </Card>
        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Check className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">24</h3>
            <p className="text-sm text-emerald-300/80">Bugün Onaylanan</p>
          </CardContent>
        </Card>
        <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <X className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">3</h3>
            <p className="text-sm text-emerald-300/80">Bugün Reddedilen</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/40 border-emerald-500/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5" />
            Onay Bekleyen Görevler
          </CardTitle>
        </CardHeader>
        <CardContent>
          {approvals.length === 0 ? (
            <div className="text-center py-12">
              <CheckSquare className="w-12 h-12 text-emerald-500/50 mx-auto mb-3" />
              <p className="text-emerald-300/70">Onay bekleyen görev bulunmuyor</p>
            </div>
          ) : (
            <div className="space-y-4">
              {approvals.map((approval) => (
                <div key={approval.id} className="p-5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-bold">{approval.user[0]}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{approval.user}</h3>
                          <p className="text-sm text-emerald-300/70">{approval.task}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-emerald-400/60">
                          {new Date(approval.submitted_at).toLocaleString('tr-TR')}
                        </span>
                        {approval.proof_url && (
                          <a
                            href={approval.proof_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Kanıtı Görüntüle
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(approval.id, approval.user)}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Onayla
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(approval.id, approval.user)}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reddet
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
