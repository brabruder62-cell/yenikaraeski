import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { upload } from '@devvai/devv-code-backend';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  className?: string;
  maxSizeMB?: number;
}

export default function ImageUpload({ 
  value, 
  onChange, 
  onRemove,
  className,
  maxSizeMB = 5 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      toast({
        title: 'File too large',
        description: `Maximum file size is ${maxSizeMB}MB`,
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsUploading(true);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const result = await upload.uploadFile(file);

      if (upload.isErrorResponse(result)) {
        throw new Error(result.errMsg);
      }

      if (result.link) {
        onChange(result.link);
        toast({
          title: 'Upload successful',
          description: 'Image uploaded successfully',
        });
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload image',
        variant: 'destructive',
      });
      setPreview(undefined);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    onRemove?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {preview ? (
        <div className="relative rounded-lg border border-border overflow-hidden bg-card">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
            onError={() => setPreview(undefined)}
          />
          
          {isUploading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {!isUploading && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'border-2 border-dashed border-border rounded-lg p-8',
            'flex flex-col items-center justify-center gap-3',
            'cursor-pointer hover:border-primary transition-colors',
            'bg-card hover:bg-card/50',
            isUploading && 'pointer-events-none opacity-50'
          )}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </>
          ) : (
            <>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Click to upload image</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Max size: {maxSizeMB}MB
                </p>
              </div>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
