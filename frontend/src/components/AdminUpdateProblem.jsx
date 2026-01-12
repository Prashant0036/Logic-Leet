
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router';
import axiosClient from '../utils/axiosClient';
import getProblem from '../utils/getProblem';

// ---------------- ZOD SCHEMA ----------------
const problemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  tags: z.enum(['function', 'array', 'linkedList', 'graph', 'dp']),

  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1),
      explanation: z.string().min(1),
    })
  ),

  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1),
    })
  ),

  templateCode: z.array(
    z.object({
      language: z.enum(['c++', 'Java', 'Python', 'JavaScript']),
      boilerPlate: z.string().min(1),
    })
  ),

  referenceSolution: z.array(
    z.object({
      language: z.enum(['c++', 'Java', 'Python', 'JavaScript']),
      completeCode: z.string().min(1),
    })
  ),
});

const languages = ['c++', 'Java', 'Python', 'JavaScript'];

function AdminUpdateProblem() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ---------------- React Hook Form ----------------
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible,
  } = useFieldArray({
    control,
    name: 'visibleTestCases',
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden,
  } = useFieldArray({
    control,
    name: 'hiddenTestCases',
  });

  // ---------------- FETCH & PREFILL ----------------
  useEffect(() => {
    async function fetchProblem() {
      try {
        const data = await getProblem(problemId);

        // reset is used to prefill in react hook form 
        reset({
          title: data.title,
          description: data.description,
          difficulty: data.difficulty,
          tags: data.tags,
          visibleTestCases: data.visibleTestCases,
          hiddenTestCases: data.hiddenTestCases,
          templateCode: data.templateCode,
          referenceSolution: data.referenceSolution,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProblem();
  }, [problemId, reset]);

  // ---------------- SUBMIT ----------------
  const onSubmit = async (formData) => {
    try {
      // console.log("Update button clicked");
      setUpdating(true);
      await axiosClient.put(`/problem/update/${problemId}`, formData);
      setUpdating(false);
      alert('Problem updated successfully');
      navigate('/admin');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ---------------- UI ----------------
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Update Problem</h1>

      <form onSubmit={handleSubmit(onSubmit,
    (errors) => {
      console.log('FORM ERRORS', errors);
    })} className="space-y-6">

        {/* BASIC INFO */}
        <div className="card bg-base-100 shadow p-6 space-y-4">
          <input {...register('title')} placeholder="Title" className="input input-bordered" />
          <textarea {...register('description')} placeholder="Description" className="textarea textarea-bordered" />

          <div className="flex gap-4">
            <select {...register('difficulty')} className="select select-bordered w-1/2">
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <select {...register('tags')} className="select select-bordered w-1/2">
              <option value="function">Function</option>
              <option value="array">Array</option>
              <option value="linkedList">Linked List</option>
              <option value="graph">Graph</option>
              <option value="dp">DP</option>
            </select>
          </div>
        </div>

        {/* VISIBLE TEST CASES */}
        <div className="card bg-base-100 shadow p-6">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Visible Test Cases</h2>
            <button type="button" onClick={() => appendVisible({ input: '', output: '', explanation: '' })} className="btn btn-sm">
              Add
            </button>
          </div>

          {visibleFields.map((field, index) => (
            <div key={field.id} className="space-y-2 mb-4">
              <input {...register(`visibleTestCases.${index}.input`)} placeholder="Input" className="input input-bordered" />
              <input {...register(`visibleTestCases.${index}.output`)} placeholder="Output" className="input input-bordered" />
              <textarea {...register(`visibleTestCases.${index}.explanation`)} placeholder="Explanation" className="textarea textarea-bordered" />
              <button type="button" onClick={() => removeVisible(index)} className="btn btn-xs btn-error">
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* HIDDEN TEST CASES */}
        <div className="card bg-base-100 shadow p-6">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Hidden Test Cases</h2>
            <button type="button" onClick={() => appendHidden({ input: '', output: '' })} className="btn btn-sm">
              Add
            </button>
          </div>

          {hiddenFields.map((field, index) => (
            <div key={field.id} className="space-y-2 mb-4">
              <input {...register(`hiddenTestCases.${index}.input`)} placeholder="Input" className="input input-bordered" />
              <input {...register(`hiddenTestCases.${index}.output`)} placeholder="Output" className="input input-bordered" />
              <button type="button" onClick={() => removeHidden(index)} className="btn btn-xs btn-error">
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* CODE */}
        <div className="card bg-base-100 shadow p-6">
          {languages.map((lang, index) => (
            <div key={lang} className="mb-6">
              <h3 className="font-semibold mb-2">{lang}</h3>

              <textarea
                {...register(`templateCode.${index}.boilerPlate`)}
                placeholder="Template Code"
                rows={6}
                className="textarea textarea-bordered font-mono w-full mb-2"
              />

              <textarea
                {...register(`referenceSolution.${index}.completeCode`)}
                placeholder="Reference Solution"
                rows={6}
                className="textarea textarea-bordered font-mono w-full"
              />
            </div>
          ))}
        </div>

       <button
  type="submit"
  className="btn btn-primary w-full"
  disabled={updating}
>
  {updating ? (
    <span className="flex items-center gap-2">
      <span className="loading loading-spinner loading-sm"></span>
      Updating...
    </span>
  ) : (
    'Update Problem'
  )}
</button>

      </form>
    </div>
  );
}

export default AdminUpdateProblem;
