import React, { useMemo } from 'react';
import Layout from '@/components/Layout';
import { useTags } from '@/contexts/TagContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, ZoomIn } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

export default function ReportPage() {
  const { tags, categories } = useTags();

  const pieData = useMemo(() => {
    return categories.map(cat => ({
      name: cat.name,
      value: tags.filter(t => t.category === cat.id).length,
      color: cat.color
    })).filter(d => d.value > 0);
  }, [tags, categories]);

  const barData = useMemo(() => {
    // Mock monthly data for demonstration
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => {
      const data: any = { name: month };
      categories.forEach(cat => {
        data[cat.name] = Math.floor(Math.random() * 10); // Mock random data
      });
      return data;
    });
  }, [categories]);

  const handleExport = () => {
    const dataStr = JSON.stringify(tags, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'video_tags_backup.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">交互式可视化报告</h2>
            <p className="text-muted-foreground mt-1">深入洞察您的视频关键词数据趋势</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出数据
            </Button>
            <Button>
              <Share2 className="w-4 h-4 mr-2" />
              分享报告
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Benefit A: 更直观地探索数据 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>分类占比概览</CardTitle>
                <CardDescription>
                  直观展示各类别关键词的分布情况，帮助您快速识别内容重心。
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefit B: 更好地理解趋势 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>增长趋势分析</CardTitle>
                <CardDescription>
                  追踪不同类别关键词随时间的增长趋势，发现潜在的内容创作方向。
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend />
                    {categories.map((cat, index) => (
                      <Bar 
                        key={cat.id} 
                        dataKey={cat.name} 
                        stackId="a" 
                        fill={cat.color} 
                        radius={index === categories.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Benefit C: 方便保存或分享 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-primary text-primary-foreground overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div>
                <h3 className="text-2xl font-bold mb-2">随时随地访问您的数据</h3>
                <p className="text-primary-foreground/80 max-w-xl">
                  这份交互式报告不仅支持实时查看，还可以一键导出为 JSON 格式进行本地备份，或者生成分享链接发送给团队成员。无论是在桌面端还是移动端，都能获得一致的流畅体验。
                </p>
              </div>
              <Button variant="secondary" size="lg" className="whitespace-nowrap">
                <ZoomIn className="w-4 h-4 mr-2" />
                全屏演示模式
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
