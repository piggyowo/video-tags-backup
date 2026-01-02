import React from 'react';
import { useLocation } from 'wouter';
import Layout from '@/components/Layout';
import { useTags } from '@/contexts/TagContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hash, Layers, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { tags, categories } = useTags();
  const [, navigate] = useLocation();

  const stats = [
    {
      title: "总标签数",
      value: tags.length,
      icon: Hash,
      description: "所有已备份的关键词",
      color: "text-blue-500",
      clickable: true
    },
    {
      title: "分类数量",
      value: categories.length,
      icon: Layers,
      description: "当前的分类总数",
      color: "text-purple-500",
      clickable: false
    },
    {
      title: "本周新增",
      value: tags.filter(t => Date.now() - t.createdAt < 7 * 24 * 60 * 60 * 1000).length,
      icon: TrendingUp,
      description: "最近7天添加的标签",
      color: "text-green-500",
      clickable: false
    },
  ];

  const handleStatClick = (stat: any) => {
    if (stat.clickable) {
      navigate('/tags');
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">概览</h2>
          <p className="text-muted-foreground mt-1">欢迎回来，这里是您的视频关键词数据中心。</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleStatClick(stat)}
              className={stat.clickable ? "cursor-pointer" : ""}
            >
              <Card className={stat.clickable ? "hover:shadow-lg hover:border-primary/50 transition-all duration-200 group" : ""}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    {stat.clickable && (
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-1" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-mono">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>最近添加</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tags.slice(0, 5).map(tag => {
                  const category = categories.find(c => c.id === tag.category);
                  return (
                    <div key={tag.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category?.color }} />
                        <span className="font-medium">{tag.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        {new Date(tag.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  );
                })}
                {tags.length === 0 && (
                  <div className="text-center text-muted-foreground py-4">暂无数据</div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>分类分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map(cat => {
                  const count = tags.filter(t => t.category === cat.id).length;
                  const percentage = tags.length > 0 ? Math.round((count / tags.length) * 100) : 0;
                  return (
                    <div key={cat.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                          {cat.name}
                        </span>
                        <span className="font-mono text-muted-foreground">{count} ({percentage}%)</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500" 
                          style={{ width: `${percentage}%`, backgroundColor: cat.color }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
