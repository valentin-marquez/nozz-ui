import { Button, ButtonIcon } from '@/ui/button';
import { Plus } from 'lucide-react';

const ButtonExamples = () => {
  return (
    <div className="flex flex-col gap-4 p-4 ">
      {/* Ejemplo básico */}
      <Button variant="default" className="w-40">
        <ButtonIcon>
          <Plus className="w-5 h-5" />
        </ButtonIcon>
        Agregar Item
      </Button>

      {/* Más ejemplos para verificar que todo funcione */}
      <Button variant="subtle" className="w-40">
        <ButtonIcon>
          <Plus className="w-5 h-5" />
        </ButtonIcon>
        Subtle
      </Button>

      <Button variant="ghost" className="w-40">
        <ButtonIcon side="right">
          <Plus className="w-5 h-5" />
        </ButtonIcon>
        Ghost
      </Button>

      <Button variant="nav" className="w-40">
        <ButtonIcon>
          <Plus className="w-5 h-5" />
        </ButtonIcon>
        Nav
      </Button>

      <Button variant="outline" className="w-40">
        <ButtonIcon>
          <Plus className="w-5 h-5" />
        </ButtonIcon>
        Outline
      </Button>

      <Button variant="link" className="w-40">
        <ButtonIcon>
          <Plus className="w-5 h-5" />
        </ButtonIcon>
        Link
      </Button>

      <Button variant="danger" className="w-40">
        <ButtonIcon>
          <Plus className="w-5 h-5" />
        </ButtonIcon>
        Danger
      </Button>
    </div>
  );
};

export default ButtonExamples;
