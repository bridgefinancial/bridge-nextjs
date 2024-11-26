import LoadingSpinner from '@/components/atoms/loaders/LoadingSpinner';
import { useImprovementArea } from '@/services/recommendations.service';
import { Book, Close } from '@mui/icons-material';
import { Dialog, DialogContent, useMediaQuery, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import './ImprovementAreaDialog.scss';

type ImprovementAreaDialogProps = {
  open: boolean;
  onClose: () => void;
  improvementAreaId: number;
};

const ImprovementAreaDialog = ({
  open,
  onClose,
  improvementAreaId,
}: ImprovementAreaDialogProps) => {
  // THEME
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // QUERIES
  const { data: improvementArea, isLoading } = useImprovementArea({
    id: improvementAreaId,
  });

  // CALCULATED
  const sentences = useMemo(() => {
    if (!improvementArea) {
      return [];
    }
    return improvementArea.how_it_impacts.split('. ');
  }, []);

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
      }}
      fullScreen={fullScreen}
    >
      <DialogContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="lg:px-10 lg:py-12 bg-gray-200 rounded-[20px]">
            <div
              className="absolute top-0 right-0 p-1 cursor-pointer"
              onClick={onClose}
            >
              <Close />
            </div>
            <div className="p-2 lg:p-6 lg:border lg:border-solid lg:border-bridge-gray-border rounded-[20px] bg-white flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-8">
              <div className="lg:w-1/2 flex flex-col items-start gap-8 py-6 px-3 lg:px-6">
                <h3 className="text-[20px] text-bridge-black">
                  {improvementArea?.what_is_it}
                </h3>
                <div className="flex flex-col gap-2">
                  <h5 className="text-[16px]">Why is it important?</h5>
                  <p className="text-sm">{improvementArea?.why_important}</p>
                </div>
              </div>
              <div className="lg:w-1/2 gradient-border flex flex-col gap-6 p-[2px]">
                <div className="bg-white h-full rounded-[20px] p-3 lg:p-6 space-y-4">
                  <div className="flex items-center justify-start gap-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full shrink-0 bg-[#F1EFFA]">
                      <Book />
                    </div>
                    <h4 className="text-[16px] text-bridge-black">
                      How will this impact my business?
                    </h4>
                  </div>
                  <div className="flex flex-col gap-1">
                    {sentences.map((sentence, index) => {
                      return (
                        <div
                          key={index}
                          className="bg-gray-100 rounded-xl p-2 px-4 flex items-center justify-start gap-4"
                        >
                          <div className="bg-bridge-dark-purple w-2 h-2 rounded-full shrink-0" />
                          <p className="text-xs">{sentence}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImprovementAreaDialog;
